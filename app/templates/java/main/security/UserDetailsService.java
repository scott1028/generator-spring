package <%= basePackage %>.security;

import <%= basePackage %>.model.Account;
import <%= basePackage %>.repository.AccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collection;

@Service
@Transactional(readOnly=true)
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(UserDetailsService.class);
    @Inject private AccountRepository repository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) throws UsernameNotFoundException, DataAccessException {
        log.debug("Authenticating {}", login);
        System.out.printf("Authenticating user: %s\n", login);
        String lowercaseLogin = login.toLowerCase();

        Account accountFromDatabase = repository.findByEmail(login);
        if (accountFromDatabase == null) {
            throw new UsernameNotFoundException("Account " + lowercaseLogin + " was not found in the database");
        }

        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();

        return new UserDetailsCustom(lowercaseLogin, accountFromDatabase.getPassword(), grantedAuthorities, accountFromDatabase);
    }
}
