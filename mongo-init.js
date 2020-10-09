db.createUser(
        {
            user: "teom",
            pwd: "teom*admin",
            roles: [
                {
                    role: "readWrite",
                    db: "indicators"
                }
            ]
        }
);
