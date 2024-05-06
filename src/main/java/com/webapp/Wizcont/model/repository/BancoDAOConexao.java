package com.webapp.Wizcont.model.repository;
import java.util.ArrayList;
import java.util.Optional;
import java.util.ArrayList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.webapp.Wizcont.model.BancoDAO;
import com.webapp.Wizcont.model.enums.StatusCategoria;

@Repository
public interface BancoDAOConexao extends JpaRepository<BancoDAO, String>{
    BancoDAO save(BancoDAO banco);
    BancoDAO findByCategoria(StatusCategoria categoria);
    @SuppressWarnings("null")
    @Query(value = "select * from bancodao where id_user = ?1", nativeQuery = true)
    ArrayList<BancoDAO> findByUserId(String id_user);
}
