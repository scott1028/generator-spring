package <%= basePackage %>.service;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.io.StringWriter;
import java.util.List;

public abstract class BaseServiceImpl<T, ID extends Serializable> implements BaseService<T, ID> {

    public static final ObjectMapper MAPPER = new ObjectMapper();

    static {
        MAPPER.registerModule(new JodaModule());
        MAPPER.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }

    @Override
    public <T> T copy(Object formBean, T target) {
        BeanUtils.copyProperties(formBean, target, IGNORE_PROPERTIES);
        return target;
    }

    @Override
    public String toJson(T item) throws Exception {
        StringWriter sw = new StringWriter();
        MAPPER.writeValue(sw, item);
        return sw.toString();
    }

    @Override
    public String toJson(List<T> item) throws Exception {
        StringWriter sw = new StringWriter();
        MAPPER.writeValue(sw, item);
        return sw.toString();
    }

}
