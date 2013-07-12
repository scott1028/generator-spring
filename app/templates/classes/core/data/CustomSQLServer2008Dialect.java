package <%= corePackage %>.data;

import java.sql.Types;

import org.hibernate.dialect.SQLServer2008Dialect;

public class CustomSQLServer2008Dialect extends SQLServer2008Dialect {

	private static final int MAX_LENGTH = 8000;
	
	public CustomSQLServer2008Dialect() {
		super();
		registerColumnType(Types.CHAR, "nchar(1)");
		registerColumnType( Types.VARCHAR, "nvarchar(MAX)" );
		registerColumnType( Types.VARCHAR, MAX_LENGTH, "nvarchar($l)" );
		registerColumnType(Types.LONGVARCHAR, "nvarchar($l)");
		registerColumnType(Types.CLOB, "ntext");
	}
}
