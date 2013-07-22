package <%= basePackage %>.data;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import <%= corePackage %>.domain.Person;
import <%= corePackage %>.testing.MockAuditorAware;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({ "/spring/test-app-data.xml" })
@Transactional
public abstract class BaseIntegrationTest {

	public static String USER_TEST = "TEST";

	@PersistenceContext
	protected EntityManager em;

	@Autowired
	protected MockAuditorAware auditorAware;
	
	@Before
	public void wireUpAuditor() {
		auditorAware.setCurrentAuditor(em.getReference(Person.class, 1));
	}
}