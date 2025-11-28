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
    private String itemName;
    private String itemQuantity;
    @Column(nullable = true)
    private String sellerName;

    public Item() {

    }

    public Item(Long id, String itemName, String itemQuantity, String sellerName) {
        this.id = id;
        this.itemName = itemName;
        this.itemQuantity = itemQuantity;
        this.sellerName = sellerName;
    }


}