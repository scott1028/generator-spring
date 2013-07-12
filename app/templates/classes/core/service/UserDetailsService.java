package <%= corePackage %>.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.ucdavis.its.authpack.ShibHeaderValues;
import edu.ucdavis.its.authpack.util.ShibHeaderSessionInjector;
import <%= corePackage %>.data.PersonRepository;
import <%= corePackage %>.domain.Person;

@Service
public class UserDetailsService implements AuthenticationUserDetailsService<Authentication> {

	private @Autowired PersonRepository repository;
	private @Autowired HttpServletRequest request;

	@Override
	public UserDetails loadUserDetails(Authentication token) throws UsernameNotFoundException {
		String principal = (String) token.getPrincipal();
		Person person = repository.findByPrincipal(principal);

		if(person == null) {
			person = createPerson();
		}

		List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
		
		return new User(person.getId().toString(), person.getEmail(), true, true, true, true, authList);
	}

	private Person createPerson() {
		// create new person base on information in shib header
		ShibHeaderValues shibValues = (ShibHeaderValues)request.getSession(false).getAttribute(ShibHeaderSessionInjector.SHIB_DEFAULT_SESSION_INJECTION_KEY);
		
		Person person = new Person();
		person.setEmail(shibValues.getShibEmailAddress());
		person.setFirstName(shibValues.getShibFirstName());
		person.setLastName(shibValues.getShibLastName());
		person.setEppn(shibValues.getShibUserId());
		if(!StringUtils.isBlank(shibValues.getShibUcnetId())){
			person.setNetId(shibValues.getShibUcnetId());
		}
		
		repository.save(person);
		return person;
	}
}
