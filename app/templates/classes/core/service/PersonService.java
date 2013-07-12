package <%= corePackage %>.service;

import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Pageable;

import edu.ucdavis.its.authpack.IdpInfo;
import <%= corePackage %>.domain.Person;

public interface PersonService extends BaseService<Person, Integer> {

	Person findByPrincipal(String principal);

	List<Person> findByName(String lastName, String firstName, Pageable pageable);
	
	List<Person> findByName(String lastName, String firstName, IdpInfo idpInfo, Pageable pageable);
	
	Person currentUser();

	String buildShibHeader(Person value) throws Exception;

}