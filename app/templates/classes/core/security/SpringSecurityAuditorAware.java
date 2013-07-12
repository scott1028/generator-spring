package <%= corePackage %>.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import <%= corePackage %>.domain.Person;
import <%= corePackage %>.service.PersonService;

@Component
public class SpringSecurityAuditorAware implements AuditorAware<Person> {

	@Autowired private PersonService service;

	public PersonService getService() { return service; }
	public void setService(PersonService service) { this.service = service; }

	@Override
	public Person getCurrentAuditor() {
		return service.currentUser();
	}

}