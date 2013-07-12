package <%= corePackage %>.service;

import java.io.Serializable;

public interface BaseService<T, ID extends Serializable> {
	
	public static final String[] IGNORE_PROPERTIES = new String[] { "id",
		"createdDate", "createdBy", "lastModifiedDate", "lastModifiedBy" };

	T find(ID id);

	T save(T entity);

	String toJson(T item) throws Exception;

	<U> String toJson(T item, Class<U> clazz) throws Exception;

}
