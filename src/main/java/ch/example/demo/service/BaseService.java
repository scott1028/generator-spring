package ch.example.demo.service;

import java.io.Serializable;
import java.util.List;

public interface BaseService<T, ID extends Serializable> {

    public static final String[] IGNORE_PROPERTIES = new String[] { "id", "createdDate", "createdBy", "lastModifiedDate", "lastModifiedBy" };

    T find(ID id);

    T save(T entity);

    <T> T copy(Object formBean, T target);

    String toJson(T item) throws Exception;

    String toJson(List<T> item) throws Exception;

}
