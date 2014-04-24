package ch.example.demo.security;

import ch.example.demo.model.Account;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class UserDetailsCustom extends User {

    private Account account;

    public UserDetailsCustom(String username, String password, Collection<? extends GrantedAuthority> authorities, Account accountFromDatabase) {
        super(username, password, authorities);
        this.account = accountFromDatabase;
    }

    public Account getAccount() { return account; }
    public void setAccount(Account account) { this.account = account; }
}
