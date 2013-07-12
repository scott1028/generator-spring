package <%= corePackage %>.data;

public class RecordNotFoundException extends RuntimeException {

	public RecordNotFoundException() {
		super("Record not found.");
	}

	public RecordNotFoundException(String s) {
		super(s);
	}

}