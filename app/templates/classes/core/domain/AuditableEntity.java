package <%= corePackage %>.domain;

import java.io.Serializable;

import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;

import org.joda.time.DateTime;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

@MappedSuperclass
public abstract class AuditableEntity<T extends Serializable> extends BaseObject<Id> {
	
	private static final long serialVersionUID = 1L;
	
	@CreatedDate
	@NotNull
	private DateTime createdDate = DateTime.now();

	@LastModifiedDate
	@NotNull
	private DateTime lastModifiedDate = DateTime.now();
	
	@CreatedBy
	@ManyToOne(fetch = FetchType.LAZY) 
	@JoinColumn
	@NotNull
	private Person createdBy;
	
	@LastModifiedBy
	@ManyToOne(fetch = FetchType.LAZY) 
	@JoinColumn
	@NotNull
	private Person lastModifiedBy;
	
	// Properties
	public abstract T getId();
	public DateTime getCreatedDate() { return createdDate; }
	public DateTime getLastModifiedDate() { return lastModifiedDate; }
	public Person getCreatedBy() { return createdBy; }
	public Person getLastModifiedBy() { return lastModifiedBy; }

	public void setCreatedDate(DateTime createdDate) { this.createdDate = createdDate; }
	public void setLastModifiedDate(DateTime lastModifiedDate) { this.lastModifiedDate = lastModifiedDate; }
	public void setCreatedBy(Person createdBy) { this.createdBy = createdBy; }
	public void setLastModifiedBy(Person lastModifiedBy) { this.lastModifiedBy = lastModifiedBy; }
}