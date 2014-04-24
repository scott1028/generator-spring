package ch.example.demo.test.config;

import ch.example.demo.model.Account;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

@Component
public class MockAuditorAware implements AuditorAware<Account> {

    private Account currentAuditor;

    @Override
    public Account getCurrentAuditor() { return currentAuditor; }
    public void setCurrentAuditor(Account account) {this.currentAuditor = account; }

}
