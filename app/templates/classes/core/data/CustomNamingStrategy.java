package <%= corePackage %>.data;

import org.hibernate.cfg.DefaultNamingStrategy;

public class CustomNamingStrategy extends DefaultNamingStrategy {

	private static final long serialVersionUID = 1L;


	/**
	 * Return the full property path with underscore seperators, mixed case
	 * converted to underscores
	 */
	@Override
	public String propertyToColumnName(String propertyName) {
		return toPascalCase(super.propertyToColumnName(propertyName));
	}

	/**
	 * Convert mixed case to underscores
	 */
	@Override
	public String columnName(String columnName) {
		return toPascalCase(columnName);
	}

	@Override
	public String collectionTableName(
			String ownerEntity, String ownerEntityTable, String associatedEntity, String associatedEntityTable,
			String propertyName
	) {
		return tableName( ownerEntityTable + "To" + associatedEntityTable );
	}
	
	private String toPascalCase(String value){
	    return value.substring(0, 1).toUpperCase() + value.substring(1);
	}
}
