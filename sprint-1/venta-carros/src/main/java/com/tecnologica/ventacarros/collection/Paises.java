package com.tecnologica.ventacarros.collection;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.annotation.Id;

@Document("paises") 
public class Paises{
	
	@Id	
	private String Id;
	
	@Field("codigo")
	private String Codigo;
	
	@Field("descripcion")
	private String Descripcion;

	@Field("estado")
	private Boolean Estado;
	
	@DBRef
	private Continentes ContinenteId;

	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

	public String getCodigo() {
		return Codigo;
	}

	public void setCodigo(String codigo) {
		Codigo = codigo;
	}

	public String getDescripcion() {
		return Descripcion;
	}

	public void setDescripcion(String descripcion) {
		Descripcion = descripcion;
	}

	public Boolean getEstado() {
		return Estado;
	}

	public void setEstado(Boolean estado) {
		Estado = estado;
	}

	public Continentes getContinenteId() {
		return ContinenteId;
	}

	public void setContinenteId(Continentes continenteId) {
		ContinenteId = continenteId;
	}
}
