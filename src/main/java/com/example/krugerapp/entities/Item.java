package com.example.krugerapp.entities;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "item")
@Data
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String itemEmpresa;
    private String itemNome;
    private String itemQuantidade;
    @Column(nullable = true)
    private String vendedorNome;

    public Item() {

    }

    public Item(Long id, String itemEmpresa, String itemName, String itemQuantity, String sellerName) {
        this.id = id;
        this.itemEmpresa = itemEmpresa;
        this.itemNome = itemNome;
        this.itemQuantidade = itemQuantidade;
        this.vendedorNome = vendedorNome;
    }


}