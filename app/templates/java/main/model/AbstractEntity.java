package <%= basePackage %>.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonAutoDetect(
        fieldVisibility = JsonAutoDetect.Visibility.NONE,
        getterVisibility = JsonAutoDetect.Visibility.NONE,
        isGetterVisibility = JsonAutoDetect.Visibility.NONE
)
@JsonIgnoreProperties(ignoreUnknown = true)
public abstract class AbstractEntity {

    @CreatedDate
    @NotNull
    @Type(type="org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    private DateTime createdDate = DateTime.now();

    @LastModifiedDate
    @NotNull
    @Type(type="org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    private DateTime lastModifiedDate = DateTime.now();

    @CreatedBy
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    @NotNull
    private Account createdBy;

    @LastModifiedBy
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    @NotNull
    private Account lastModifiedBy;

    public DateTime getCreatedDate() { return createdDate; }
    public DateTime getLastModifiedDate() { return lastModifiedDate; }
    public Account getCreatedBy() { return createdBy; }
    public Account getLastModifiedBy() { return lastModifiedBy; }

    public void setCreatedDate(DateTime createdDate) { this.createdDate = createdDate; }
    public void setLastModifiedDate(DateTime lastModifiedDate) { this.lastModifiedDate = lastModifiedDate; }
    public void setCreatedBy(Account createdBy) { this.createdBy = createdBy; }
    public void setLastModifiedBy(Account lastModifiedBy) { this.lastModifiedBy = lastModifiedBy; }
}