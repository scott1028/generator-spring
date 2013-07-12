package <%= corePackage %>.data;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import edu.ucdavis.its.authpack.IdpInfo;
import <%= corePackage %>.domain.Person;

public interface PersonRepository extends CustomJpaRepository<Person, Integer>{
	
	@Query("select p from Person p where p.netId = ?1 or p.eppn = ?1")
	Person findByPrincipal(String principal);

	@Query("select p from Person p where p.lastName like ?1% and p.firstName like ?2%")
	List<Person> findByName(String lastName, String firstName, Pageable pageable);

	@Query("select p from Person p where p.lastName like ?1% and p.firstName like ?2% and p.idpInfo = ?3")
	List<Person> findByName(String lastName, String firstName, IdpInfo idpInfo, Pageable pageable);

}