package <%= corePackage %>.domain;

public interface EnumWithDescription {
	
	String name();
	
	/**
	 * Returns a friendly description (can contain spaces) of the code.
	 * @return
	 */
	String getDescription();
}
