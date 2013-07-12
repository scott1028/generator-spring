package <%= corePackage %>.service;

import java.io.Serializable;
import java.io.StringWriter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.joda.JodaModule;

public abstract class BaseServiceImpl<T, ID extends Serializable> implements BaseService<T, ID> {
	
	public static final ObjectMapper MAPPER = new ObjectMapper();
	
	static {
		MAPPER.registerModule(new JodaModule());
	}
	
	@Override
	public String toJson(T item) throws Exception {
		StringWriter sw = new StringWriter();
		MAPPER.writeValue(sw, item);
		return sw.toString();
	}
	
	@Override
	public <U> String toJson(T item, Class<U> clazz) throws Exception {
		StringWriter sw = new StringWriter();
		MAPPER.writerWithView(clazz).writeValue(sw, item);
		return sw.toString();
	}
}
