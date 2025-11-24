package com.fdmcadastros.fdmcadastros.enuns.error

enum class Errors(
    val code: String,
    val message: String,
) {
    // 101 ao 200 (Id Error)
    FDM101("FDM-101", "id [%s] not found"),

    // 201 ao 300 (Inactive Error)
    FDM201("FDM-201", "you do cannot change INACTIVE student"),

    //301 a 400 (Query Error)
    FDM301("FDM-301", "this query does not exist"),

    //401 a 500 (E-mail Error)
    FDM401("FDM-401", "e-mail already exists. Try other"),
    FDM402("FDM-402", "e-mail must have a valid domain"),

    //501 a 600 (Authentication Error)
    FDM501("FDM-501", "Authentication Failed"),

    //601 a 700 (Authorization Error)
    FDM601("FDM-601", "invalid signature"),
    FDM602("FDM-602", "invalid token"),

    //701 a 800 (Request Error)
    FDM701("FDM-701", "invalid request"),

}