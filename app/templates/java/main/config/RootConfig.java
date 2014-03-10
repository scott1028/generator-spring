package <%= basePackage %>.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("<%= basePackage %>")
public class RootConfig {
}