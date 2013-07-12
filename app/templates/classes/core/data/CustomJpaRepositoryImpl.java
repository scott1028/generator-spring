package <%= corePackage %>.data;

import java.io.Serializable;

import javax.persistence.EntityManager;

import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

public class CustomJpaRepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID> implements CustomJpaRepository<T, ID> {
	
	private EntityManager entityManager;

	// There are two constructors to choose from, either can be used.
	public CustomJpaRepositoryImpl(Class<T> domainClass, EntityManager entityManager) {
		super(domainClass, entityManager);

		// This is the recommended method for accessing inherited class dependencies.
		this.entityManager = entityManager;
	}
	
	@Override
	public <S extends T> S save(S entity) {
		entityManager.persist(entity);
		return entity;
	}
}
