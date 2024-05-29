/***********************************************************
 * Represents a collection of success messages.
 *
 * @typedef {Object} Success
 * @property {string} get - The success message for information retrieval.
 * @property {string} create - The success message for creation.
 * @property {string} update - The success message for updating.
 * @property {string} delete - The success message for deletion.
 * @property {Object} recovery - The success messages for password recovery.
 * @property {string} recovery.codeSent - The success message for sending a recovery code to the associated email.
 * @property {string} recovery.codeValid - The success message for a valid recovery code.
 * @property {string} recovery.passwordChanged - The success message for successfully changing the password.
 **********************************************************/
const Success = {
    get: 'Información obtenida con éxito',
    create: 'Creado con éxito',
    update: 'Actualizado con éxito',
    delete: 'Eliminado con éxito',
    recovery: {
        codeSent: 'Se ha enviado un código al correo asociado a su cuenta. Por favor, verifique su bandeja de entrada o spam',
        codeValid: 'Código válido',
        passwordChanged: 'Contraseña cambiada con éxito'
    }
};


/***********************************************************
 * Represents an error object with various error messages.
 *
 * @typedef {Object} Error
 * @property {string} notFound - The error message for "Not found" error.
 * @property {string} get - The error message for "Error while getting" error.
 * @property {string} create - The error message for "Error while creating" error.
 * @property {string} update - The error message for "Error while updating" error.
 * @property {string} delete - The error message for "Error while deleting" error.
 * @property {Object} user - The error messages related to user operations.
 * @property {string} user.emailExists - The error message for "Email already exists" error.
 * @property {string} user.unauthorized - The error message for "Unauthorized" error.
 * @property {Object} user.login - The error messages related to user login.
 * @property {string} user.login.invalidCredentials - The error message for "Invalid credentials" error.
 * @property {string} user.login.invalidPassword - The error message for "Invalid password" error.
 * @property {string} user.login.notActive - The error message for "Inactive or disabled account" error.
 * @property {Object} user.recovery - The error messages related to user recovery.
 * @property {string} user.recovery.notFound - The error message for "User not found" error.
 * @property {string} user.recovery.invalidCode - The error message for "Invalid recovery code" error.
 * @property {string} user.recovery.expiredCode - The error message for "Expired recovery code" error.
 **********************************************************/
const Error = {
    notFound: 'No encontrado',
    get: 'Error al obtener',
    create: 'Error al crear',
    update: 'Error al actualizar',
    delete: 'Error al eliminar',
    user: {
        emailExists: 'Email ya existe',
        unauthorized: 'No autorizado',
        tokenExpired: 'Token expirado',
        login: {
            invalidCredentials: 'Credenciales inválidas',
            invalidPassword: 'Contraseña inválida',
            notActive: 'Cuenta no activa o deshabilitada'
        },
        recovery: {
            notFound: 'Usuario no encontrado',
            invalidCode: 'Código inválido',
            expiredCode: 'Código expirado'

        }
    },
    playlist:{
        invalid: 'Lista de reproducción inválida'
    },
    channel:{
        invalid: 'Canal inválido',
        channelExists: 'El canal ya existe'
    }
};

export { Success, Error };