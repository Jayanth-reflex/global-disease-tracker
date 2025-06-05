package com.covid.authService.domain;

	import javax.persistence.Column;

	import javax.persistence.Entity;
	import javax.persistence.GeneratedValue;
	import javax.persistence.Id;
	import javax.persistence.Table;
	import lombok.AllArgsConstructor;
	import lombok.NoArgsConstructor;

	@Entity
	@Table(name = "users")
	@AllArgsConstructor
	@NoArgsConstructor
	public class User {

	    @Id
	    @GeneratedValue
	    private Integer id;

	    
	    @Column(unique = true)
	    private String email;
	   

		@Column()
	    private String password;
	    
	    @Column(unique = true)
	    private String userName;
	    
	    
	    private String firstName;
	    
		private String lastName;

		public User(int i, String string, String string2, String string3, String string4, String string5) {
			// TODO Auto-generated constructor stub
		}

		

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}
		

	    public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		
		public void setUserName(String userName) {
			this.userName = userName;
		}
		
		

	    public String getFirstName() {
			return firstName;
		}

		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}

		public String getLastName() {
			return lastName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}

		public String getUserName() {
			// TODO Auto-generated method stub
			return userName;
		}

		
	}


