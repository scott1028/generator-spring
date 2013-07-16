package <%= corePackage %>.data;

import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

import edu.ucdavis.its.authpack.IdpInfo;
import <%= corePackage %>.domain.Person;

public class PersonRepositoryTest extends BaseIntegrationTest {

	private static final String FIRST_NAME = "firstName";
	private static final String LAST_NAME = "lastName";
	private static final String EMAIL = "email";
	private static final String EPPN = "eppn";
	private static final String NET_ID = "netId";
	@Autowired PersonRepository repository;
	
	@Test
	public void canFindPrincipalByNetId() {
		Person person = personStub();
		repository.saveAndFlush(person);
		
		Person result = repository.findByPrincipal(NET_ID);
		assertThat(result, is(person));
	}

	@Test
	public void canFindPrincipalByEppn() {
		Person person = personStub();
		repository.saveAndFlush(person);
		
		Person result = repository.findByPrincipal(EPPN);
		assertThat(result, is(person));
	}
	
	@Test
	public void canFindByLastName() {
		Person person = personStub();
		repository.saveAndFlush(person);
		
		List<Person> result = repository.findByName("last%", "%", new PageRequest(0, 10));
		assertThat(result.size(), is(1));
		assertThat(result, hasItem(person));
	}
	
	@Test
	public void canFindByFirstName() {
		Person person = personStub();
		repository.saveAndFlush(person);
		
		List<Person> result = repository.findByName("%", "first%", new PageRequest(0, 10));
		assertThat(result.size(), is(1));
		assertThat(result, hasItem(person));
	}
	
	@Test
	public void canFindByLastNameAndCampus() {
		Person ucdPerson = personStub();
		Person ucbPerson = personStub();
		ucbPerson.setIdpInfo(IdpInfo.UCB);
		
		repository.saveAndFlush(ucdPerson);
		repository.saveAndFlush(ucbPerson);
		
		List<Person> result = repository.findByName("last%", "%", IdpInfo.UCD, new PageRequest(0, 10));
		assertThat(result.size(), is(1));
		assertThat(result, hasItem(ucdPerson));
	}
	
	private Person personStub() {
		Person person = new Person();
		person.setFirstName(FIRST_NAME);
		person.setLastName(LAST_NAME);
		person.setEmail(EMAIL);
		person.setNetId(NET_ID);
		person.setEppn(EPPN);
		person.setIdpInfo(IdpInfo.UCD);
		return person;
	}
}
