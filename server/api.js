/**
 * HTTP API接口，对应所有操作数据库的逻辑
 */

module.exports = {
	// 基础API
	BASE_CHECK_LOGIN: '/view/meet',
	BASE_LOGIN: '/view/login',
	BASE_REGIST: '/view/regist',
	BASE_LOGOUT: '/view/logout',
	// 公共API
	GET_IMG: '/view/uploadImg',
	GET_THUMB: '/view/thumbnail',
	GET_AUDIO: '/view/audio',
	GET_SINGLE_PAINTING: '/view/painting',
	GET_CAROUSEL_PAITINGS: '/view/paintingList',
	GET_PAGE_PAINTINGS: '/view/thumbnailList',
	GET_ALL_ARTISTS: '/view/artists',
	GET_ARTIST_INFO: '/view/artistInfo',
	GET_PAITING_INFO: '/view/paintingInfo',
	// 登录后用户增删查改API
	USER_ALL: '/view/user/*',
	PAINTING_IMG_UPLOAD: '/view/user/fileUpload/painting',
	ARTIST_IMG_UPLOAD: '/view/user/fileUpload/artist',
	NEW_PAINTING: '/view/user/newPainting',
	NEW_ARTIST: '/view/user/newArtist',
	EDIT_PAINTING: '/view/user/editPainting',
	EDIT_ARTIST: '/view/user/editArtist',
	DELETE_PAITING: '/view/user/deletePainting',
	DELETE_ARTIST: '/view/user/deleteArtist'
};
