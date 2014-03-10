package <%= basePackage %>.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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

    @JsonIgnore
    private String password;

    @JsonProperty
    private String firstName;

    @JsonProperty
    private String lastName;

    public Integer getId() { return id; }
    public String getEmail() { return email; }
    @JsonIgnore
    public String getPassword() { return password; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }

    public void setId(Integer id) { this.id = id; }
    public void setEmail(String email) { this.email = email; }
    @JsonProperty
    public void setPassword(String password) { this.password = password; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

}