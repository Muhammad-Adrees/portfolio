module.exports=(connect)=>{
    // create tables--------------

    const user_query=`
    CREATE TABLE IF NOT EXISTS user(
        user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255),
        user_role VARCHAR(255),
        auth_token VARCHAR(255),
        UNIQUE(email)
    );
    `
    // About table
    const about_query=`
    CREATE TABLE IF NOT EXISTS about(
        about_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        description VARCHAR(255),
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(user_id)
    );
    
    `
    // user_register table
    const user_info_query=`
    CREATE TABLE IF NOT EXISTS user_info(
        user_info_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        designation VARCHAR(255),
        location VARCHAR(255),
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    
    `
    // experience table

    const experience_query=`
    CREATE TABLE IF NOT EXISTS experience(
        experience_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        company_name VARCHAR(255),
        role VARCHAR(255),
        start_date DATE,
        end_date DATE,
        years INT,
        description VARCHAR(255),
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    `
        // education table
    const education_query=`
    CREATE TABLE IF NOT EXISTS education(
        education_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        institute_name VARCHAR(255),
        degree VARCHAR(255),
        location VARCHAR(255),
        start_date DATE,
        end_date DATE,
        description VARCHAR(255),
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    
    `
    const skills_query=`
    
    CREATE TABLE IF NOT EXISTS skill(
        skill_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        skill_name VARCHAR(255),
        start_date DATE,
        end_date DATE,
        experience_per INT,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    `
    // project_skills table
    const project_query=`
    CREATE TABLE IF NOT EXISTS project(
        project_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        file LONGBLOB,
        exe VARCHAR(255),
        title VARCHAR(255),
        start_date DATE,
        end_date DATE,
        description VARCHAR(255),
        source_link VARCHAR(255),
        live_link VARCHAR(255),
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    
    
    `


    // project_tags table

    const project_tag_query=`
    CREATE TABLE IF NOT EXISTS project_tag(
        project_tag_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        tag_name VARCHAR(255),
        user_id INT NOT NULL,
        project_id INT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    
    `

    // project languages table

    const project_language_query=`
    CREATE TABLE IF NOT EXISTS project_language(
        project_language_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        lan_name VARCHAR(255),
        lan_percentage INT,
        user_id INT NOT NULL,
        project_id INT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    
    `

    // contact table
    const contact_query=`
    CREATE TABLE IF NOT EXISTS contact(
        contact_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255),
        phone VARCHAR(255),
        linkedin VARCHAR(255),
        instagram VARCHAR(255),
        twitter VARCHAR(255),
        github VARCHAR(255),
        user_id INT NOT NULL,
        UNIQUE(email),
        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    `
    // projects table


    const createQueries=[user_query,about_query,user_info_query,
        contact_query,experience_query,
        education_query,skills_query,project_query,
        project_tag_query,project_language_query]
    for (const item of createQueries) {
        connect.query(item,(err,result)=>{
            if(err) throw err;
        })
    }
}