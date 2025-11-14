plugins {
	kotlin("jvm") version "1.9.25"
	kotlin("plugin.spring") version "1.9.25"
	id("org.springframework.boot") version "3.5.6"
	id("io.spring.dependency-management") version "1.1.7"
	kotlin("plugin.jpa") version "1.9.25"
}

group = "com.fdmcadastros"
version = "0.0.1-SNAPSHOT"
description = "Cadastros de alunos e mensalidades"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
	testImplementation("org.springframework.security:spring-security-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")

	// JPA
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")

	// Spring Security
	implementation("org.springframework.boot:spring-boot-starter-security")

	// JWT
	implementation("io.jsonwebtoken:jjwt:0.13.0")

	// .env
	implementation("io.github.cdimascio:dotenv-kotlin:6.5.1")

	// Spring Validation
	implementation("org.springframework.boot:spring-boot-starter-validation")

	// MySQL e FlyWay
	runtimeOnly("com.mysql:mysql-connector-j")
	implementation("org.flywaydb:flyway-mysql:11.1.0")
	implementation("org.flywaydb:flyway-core:11.1.0")

}

kotlin {
	compilerOptions {
		freeCompilerArgs.addAll("-Xjsr305=strict")
	}
}

allOpen {
	annotation("jakarta.persistence.Entity")
	annotation("jakarta.persistence.MappedSuperclass")
	annotation("jakarta.persistence.Embeddable")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
