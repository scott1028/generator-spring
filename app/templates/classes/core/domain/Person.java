package <%= corePackage %>.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import edu.ucdavis.its.authpack.IdpInfo;

@Entity
public class Person extends AuditableEntity<Integer> {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private Integer id;
	
	@Column(length = 30)
	private String netId;
	
	@Column(length = 50)
	@NotNull
	@JsonProperty
	private String firstName;
	
	@Column(length = 20)
	private String middleName;
	
	@Column(length = 50)
	@NotNull
	@JsonProperty
	private String lastName;
	
	@Column(length = 100)
	@NotNull
	@JsonProperty
	private String email;
	
	@Column(length = 50)
	private String eppn;
	
	@Column(length = 50)
	@JsonProperty
	private String title;
	
	@Column(length = 2)
	@NotNull
	@JsonProperty
	private IdpInfo idpInfo;

	@Override
    public Integer getId() { return id; }
	public String getNetId() { return netId; }
	public String getFirstName() { return firstName; }
	public String getMiddleName() { return middleName; }
	public String getLastName() { return lastName; }
	public String getEmail() { return email; }
	public String getEppn() { return eppn; }
	public IdpInfo getIdpInfo() { return idpInfo; }
	public String getTitle() { return title; }

	@Transient
	public String getName() {
		StringBuilder sb = new StringBuilder();
		if (getLastName() != null) {
			sb.append(getLastName());
		}
		if (getFirstName() != null) {
			sb.append(", " + getFirstName()); 
		}
		return sb.toString();
	}
	
	/**
	 * @return the netId if not null. otherwise return eppn.  this is the value shibboleth & spring use
	 */
	@Transient
	public String getPrincipal() { return netId != null ? netId : eppn; }

	public void setId(Integer id) { this.id = id; }
	public void setNetId(String netId) { this.netId = netId; }
	public void setFirstName(String firstName) { this.firstName = firstName; }
	public void setMiddleName(String middleName) { this.middleName = middleName; }
	public void setLastName(String lastName) { this.lastName = lastName; }
	public void setEmail(String email) { this.email = email; }
	public void setEppn(String eppn) { this.eppn = eppn; }
	public void setIdpInfo(IdpInfo idpInfo) { this.idpInfo = idpInfo; }
	public void setTitle(String title) { this.title = title; }
}
