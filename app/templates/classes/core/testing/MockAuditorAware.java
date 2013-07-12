package <%= corePackage %>.testing;

import org.springframework.data.domain.AuditorAware;

import <%= corePackage %>.domain.Person;

public class MockAuditorAware implements AuditorAware<Person> {

	private Person currentAuditor;
	
	@Override
	public Person getCurrentAuditor() { return currentAuditor; }
	public void setCurrentAuditor(Person person) { this.currentAuditor = person; }

}
