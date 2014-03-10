package <%= basePackage %>.security;

import <%= basePackage %>.model.Account;
import <%= basePackage %>.service.AccountService;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import javax.inject.Inject;

@Component
public class SpringSecurityAuditorAware implements AuditorAware<Account> {

    @Inject private AccountService service;

    @Override
    public Account getCurrentAuditor() {
        return service.getCurrentAccount();
    }

}
