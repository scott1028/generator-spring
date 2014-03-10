package <%= basePackage %>.service;

import <%= basePackage %>.model.Account;
import <%= basePackage %>.repository.AccountRepository;
import <%= basePackage %>.security.UserDetailsCustom;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.Collection;

@Service
public class AccountServiceImpl extends BaseServiceImpl<Account, Integer> implements AccountService {

    @Inject private AccountRepository repository;
    @Inject private PasswordEncoder encoder;

    @Override
    public Account find(Integer entity) {
        return repository.findOne(entity);
    }

    @Override
    public Account save(Account entity) {
        return repository.save(entity);
    }

    @Override
    public Account findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public Account getCurrentAccount() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        UserDetailsCustom springSecurityUser = (UserDetailsCustom) securityContext.getAuthentication().getPrincipal();
        return springSecurityUser.getAccount();
    }

    @Override
    public Boolean isAuthenticated() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        final Collection<? extends GrantedAuthority> authorities = securityContext.getAuthentication().getAuthorities();
        if (authorities != null) {
            for (GrantedAuthority authority : authorities) {
                if (authority.getAuthority().equals("ROLE_ANONYMOUS")) {
                    return false;
                }
            }
        }
        return true;
    }

    @Override
    public Account createAccount(Account account) throws Exception {
        Account findExisting = repository.findByEmail(account.getEmail());
        if(findExisting == null) {
            account.setPassword(encoder.encode(account.getPassword()));
            return repository.save(account);
        } else {
            throw new Exception("Account Already Exists");
        }
    }
}
