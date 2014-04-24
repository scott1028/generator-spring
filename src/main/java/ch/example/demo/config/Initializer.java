package ch.example.demo.config;

import org.springframework.core.annotation.Order;
import org.springframework.web.filter.HiddenHttpMethodFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.Filter;

@Order(1)
public class Initializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class< ? >[] getRootConfigClasses() {
        return new Class< ? >[] { RootConfig.class };
    }

    @Override
    protected Class< ? >[] getServletConfigClasses() {
        return new Class< ? >[] { WebAppConfig.class };
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }

    @Override
    protected Filter[] getServletFilters() {
        return new Filter[] { new HiddenHttpMethodFilter() };
    }
}