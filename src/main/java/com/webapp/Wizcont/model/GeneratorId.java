package com.webapp.Wizcont.model;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class GeneratorId implements IdentifierGenerator{
    
    @Override
    public Object generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
        // Gerar dois números randomicos
        int random1 = (int) (Math.random() * 1000);
        int random2 = (int) (Math.random() * 1000);

        // Obter o tempo do dispositivo
        long timestamp = System.currentTimeMillis();

        // Concatenar os valores para formar o ID
        String id = String.format("%d%d-%d", random1, random2, timestamp);

        return id;
    }
}
