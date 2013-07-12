@TypeDefs({
		@TypeDef(name = "PersistentDateTime", defaultForType = DateTime.class, typeClass = org.jadira.usertype.dateandtime.joda.PersistentDateTime.class),
		@TypeDef(name = "IdpInfoEnumUserType", defaultForType = IdpInfo.class, typeClass = IdpInfoEnumUserType.class)
})

package <%= corePackage %>.data;

import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
import org.joda.time.DateTime;

import edu.ucdavis.its.authpack.IdpInfo;

