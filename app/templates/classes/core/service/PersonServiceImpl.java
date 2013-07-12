package <%= corePackage %>.service;

import java.io.StringWriter;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;

import edu.ucdavis.its.authpack.AuthenticationPackConstants;
import edu.ucdavis.its.authpack.IdpInfo;
import edu.ucdavis.its.authpack.service.StringEncrypterService;
import <%= corePackage %>.data.PersonRepository;
import <%= corePackage %>.domain.Person;

@Service
@Transactional
public class PersonServiceImpl extends BaseServiceImpl<Person, Integer> implements PersonService {
	
	@Autowired private PersonRepository personRepository;
	@Autowired private StringEncrypterService stringEncrypterService;
	@Value("<%= _.unescape('${edu.ucdavis.its.authpack.configEncryptedPostData}') %>") private boolean encryptedPostData;
	
	public PersonRepository getPersonRepository() { return personRepository; }
	public StringEncrypterService getStringEncrypterService() { return stringEncrypterService; }
	public boolean isEncryptedPostData() { return encryptedPostData; }

	public void setPersonRepository(PersonRepository personRepository) { this.personRepository = personRepository; }
	public void setStringEncrypterService(StringEncrypterService stringEncrypterService) { this.stringEncrypterService = stringEncrypterService; }
	public void setEncryptedPostData(boolean encryptedPostData) { this.encryptedPostData = encryptedPostData; }

	@Override
	public Person find(Integer id) {
		return personRepository.findOne(id);
	}
	
	@Override
	public List<Person> findByName(String lastName, String firstName, Pageable pageable) {
		return personRepository.findByName(lastName, firstName, pageable);
	}
	
	@Override
	public List<Person> findByName(String lastName, String firstName, IdpInfo idfInfo, Pageable pageable) {
		return personRepository.findByName(lastName, firstName, idfInfo, pageable);
	}
	
	@Override
	public Person findByPrincipal(String principal){
		return personRepository.findByPrincipal(principal);
	}
	
	@Override
	public Person save(Person entity) {
		return personRepository.save(entity);
	}
	
	@Override
	public Person currentUser() {
		SecurityContext context = SecurityContextHolder.getContext(); 
	    Authentication authentication = context.getAuthentication();
	    if (authentication == null) {
	      return null;
	    }
	    return personRepository.findOne(Integer.parseInt(authentication.getName()));
	}

	@Override
	public String buildShibHeader(Person person) throws Exception {

		StringWriter sw = new StringWriter();
		
		JsonFactory factory = new JsonFactory();
		JsonGenerator json = factory.createJsonGenerator(sw);

		String commonName = String.format("%s %s; %s %s", person.getFirstName(), person.getLastName(), person.getFirstName(), person.getLastName());
		String displayName = String.format("%s %s", person.getFirstName(), person.getLastName());
		String shibUcnetId = person.getNetId();
		String shibUserId = person.getEppn();
		String shibLastName = person.getLastName();
		String shibFirstName = person.getFirstName();
		String shibEmailAddress = person.getEmail();
		String shibIdentityProvider = "urn:mace:incommon:ucdavis.edu";
		String shibTimestamp = AuthenticationPackConstants.dtFmt.print(new org.joda.time.DateTime());
		String shibRandomUuidString = UUID.randomUUID().toString();
		
		if(isEncryptedPostData()){
			commonName = getStringEncrypterService().encrypt(commonName);
			displayName = getStringEncrypterService().encrypt(displayName);
			shibUcnetId = getStringEncrypterService().encrypt(shibUcnetId);
			shibUserId = getStringEncrypterService().encrypt(shibUserId);
			shibLastName = getStringEncrypterService().encrypt(shibLastName);
			shibFirstName = getStringEncrypterService().encrypt(shibFirstName);
			shibEmailAddress = getStringEncrypterService().encrypt(shibEmailAddress);
			shibIdentityProvider = getStringEncrypterService().encrypt(shibIdentityProvider);
			shibTimestamp = getStringEncrypterService().encrypt(shibTimestamp);
			shibRandomUuidString = getStringEncrypterService().encrypt(shibRandomUuidString);
		}
		
		json.writeStartObject();
		json.writeStringField("shibCommonName", commonName);
		json.writeStringField("shibDisplayName", displayName);
		json.writeStringField("shibUcnetId", shibUcnetId);
		json.writeStringField("shibUserId", shibUserId);
		json.writeStringField("shibLastName", shibLastName);
		json.writeStringField("shibFirstName", shibFirstName);
		json.writeStringField("shibEmailAddress", shibEmailAddress);
		json.writeStringField("shibIdentityProvider", shibIdentityProvider);
		json.writeStringField("shibTimestamp", shibTimestamp);
		json.writeStringField("shibRandomUuidString", shibRandomUuidString);
		json.writeEndObject();

		json.close();
		
		return sw.toString();
	}

}
