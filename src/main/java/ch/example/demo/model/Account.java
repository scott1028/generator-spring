package ch.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
public class Account extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    public Integer id;

    @Email
    @NotNull
    @Column(unique = true)
    @JsonProperty
    private String email;

    private String password;

    @JsonProperty
    private String firstName;

    @JsonProperty
    private String lastName;

    @JsonProperty
    @ElementCollection(targetClass=Authority.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name="account_authority")
    @Column(name="authority")
    private Set<Authority> authorities;

    public Integer getId() { return id; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public Set<Authority> getAuthorities() { return authorities; }

    public void setId(Integer id) { this.id = id; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setAuthorities(Set<Authority> authorities) { this.authorities = authorities; }

}
