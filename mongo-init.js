db.createUser(
        {
            user: "nebula",
            pwd: "nebula",
            roles: [
                {
                    role: "readWrite",
                    db: "indicators"
                }
            ]
        }
);
