package <%= corePackage %>.data;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Properties;

import org.hibernate.HibernateException;
import org.hibernate.annotations.common.util.ReflectHelper;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.usertype.ParameterizedType;
import org.hibernate.usertype.UserType;

import <%= corePackage %>.domain.ControlCode;

public class ControlCodeEnumUserType implements UserType, ParameterizedType {
	private static final String ENUM = "enumClass";
	private Class<? extends Enum<?>> enumClass;
	private static final int SQL_TYPE = Types.VARCHAR;

	@Override
	@SuppressWarnings("unchecked")
	public void setParameterValues(Properties parameters) {
		try {
			enumClass = ReflectHelper.classForName(parameters.getProperty(ENUM), this.getClass()).asSubclass(Enum.class);
		} catch (ClassNotFoundException exception) {
			throw new HibernateException("Enum class not found", exception);
		}
	}

	@Override
	public int[] sqlTypes() {
		return new int[] { SQL_TYPE };
	}

	@Override
	public Class<? extends Enum<?>> returnedClass() {
		return enumClass;
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
				if (code.equalsIgnoreCase(((ControlCode) instance).getCode())) {
					return instance;
				}
			}
		} catch (Exception e) {
			throw new HibernateException("Custom mapping EnumByCodeType failed", e);
		}

		throw new IllegalArgumentException("Unknown code: " + code + " for enum: " + enumClass);
	}

	@Override
	public void nullSafeSet(PreparedStatement st, Object value, int index, SessionImplementor sessionImpl) throws SQLException {
		if (value == null) {
			// Binding null to parameter
			st.setNull(index, SQL_TYPE);
		} else {
			try {
				ControlCode control = (ControlCode) value;
				st.setObject(index, control.getCode(), SQL_TYPE);
			} catch (Exception e) {
				throw new HibernateException("Custom mapping EnumByCodeType failed", e);
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