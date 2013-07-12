package <%= corePackage %>.data;

public class PermissionDeniedException extends RuntimeException {

	public PermissionDeniedException() {
		super("Unauthorized action.");
	}

	public PermissionDeniedException(String s) {
		super(s);
	}

}