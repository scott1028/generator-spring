package <%= corePackage %>.data;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Properties;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.usertype.ParameterizedType;
import org.hibernate.usertype.UserType;

import edu.ucdavis.its.authpack.IdpInfo;

public class IdpInfoEnumUserType implements UserType, ParameterizedType {
	private static final int SQL_TYPE = Types.VARCHAR;

	@Override
	public void setParameterValues(Properties parameters) {
	}

	@Override
	public int[] sqlTypes() {
		return new int[] { SQL_TYPE };
	}

	@Override
	public Class<IdpInfo> returnedClass() {
		return IdpInfo.class;
	}

	@Override
	public boolean equals(Object x, Object y) {
		return x.equals(y);
	}

	@Override
	public int hashCode(Object x) {
		return x == null ? 0 : x.hashCode();
	}

	@Override
	public Object nullSafeGet(ResultSet rs, String[] names, SessionImplementor sessionImpl, Object owner) throws SQLException {
		String code = (String) rs.getObject(names[0]);

		if (rs.wasNull()) {
			return null;
		}

		try {
			for (Enum<?> instance : returnedClass().getEnumConstants()) {
				if (code.equalsIgnoreCase(((IdpInfo) instance).getCode())) {
					return instance;
				}
			}
		} catch (Exception e) {
			throw new HibernateException("Custom mapping IdpInfoEnumUserType failed", e);
		}

		throw new IllegalArgumentException("Unknown code: " + code + " for IdpInfo");
	}

	@Override
	public void nullSafeSet(PreparedStatement st, Object value, int index, SessionImplementor sessionImpl) throws SQLException {
		if (value == null) {
			// Binding null to parameter
			st.setNull(index, SQL_TYPE);
		} else {
			try {
				IdpInfo control = (IdpInfo) value;
				st.setObject(index, control.getCode(), SQL_TYPE);
			} catch (Exception e) {
				throw new HibernateException("Custom mapping IdpInfoEnumUserType failed", e);
			}
		}
	}

	@Override
	public Object deepCopy(Object value) {
		return value;
	}

	@Override
	public boolean isMutable() {
		return false;
	}

	@Override
	public Serializable disassemble(Object value) {
		return (Serializable) value;
	}

	@Override
	public Object assemble(Serializable cached, Object owner) {
		return cached;
	}

	@Override
	public Object replace(Object original, Object target, Object owner) {
		return original;
	}

}