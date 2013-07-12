package <%= corePackage %>.domain;

public interface ControlCode {
	/**
	 * The unique string representation of the code object.
	 * @return
	 */
	String getCode();

	/**
	 * Returns a friendly description (can contain spaces) of the code.
	 * @return
	 */
	String getDescription();
}
