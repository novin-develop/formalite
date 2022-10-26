import { useI18nContext } from "@components/base/I18nProvider";

export const useEditorI18n = () => {
  const { t } = useI18nContext();
  return {
    common: {
      ok: t("editor_common_ok"),
      delete: t("editor_common_delete"),
      enter: t("editor_common_enter"),
    },

    blockQuote: {
      title: t("editor_blockQuote_title"),
    },
    codeBlock: {
      title: t("editor_codeBlock_title"),
    },
    color: {
      color: t("editor_color_color"),
      bgColor: t("editor_color_bgColor"),
      default: t("editor_color_default"),
      clear: t("editor_color_clear"),
    },
    divider: {
      title: t("editor_divider_title"),
    },
    emotion: {
      title: t("editor_emotion_title"),
    },
    fontSize: {
      title: t("editor_fontSize_title"),
      default: t("editor_fontSize_default"),
    },
    fontFamily: {
      title: t("editor_fontFamily_title"),
      default: t("editor_fontFamily_default"),
    },
    fullScreen: {
      title: t("editor_fullScreen_title"),
    },
    header: {
      title: t("editor_header_title"),
      text: t("editor_header_text"),
    },
    image: {
      netImage: t("editor_image_netImage"),
      delete: t("editor_image_delete"),
      edit: t("editor_image_edit"),
      viewLink: t("editor_image_viewLink"),
      src: t("editor_image_src"),
      desc: t("editor_image_desc"),
      link: t("editor_image_link"),
    },
    indent: {
      decrease: t("editor_indent_decrease"),
      increase: t("editor_indent_increase"),
    },
    justify: {
      left: t("editor_justify_left"),
      right: t("editor_justify_right"),
      center: t("editor_justify_center"),
      justify: t("editor_justify_justify"),
    },
    lineHeight: {
      title: t("editor_lineHeight_title"),
      default: t("editor_lineHeight_default"),
    },
    link: {
      insert: t("editor_link_insert"),
      text: t("editor_link_text"),
      url: t("editor_link_url"),
      unLink: t("editor_link_unLink"),
      edit: t("editor_link_edit"),
      view: t("editor_link_view"),
    },
    textStyle: {
      bold: t("editor_textStyle_bold"),
      clear: t("editor_textStyle_clear"),
      code: t("editor_textStyle_code"),
      italic: t("editor_textStyle_italic"),
      sub: t("editor_textStyle_sub"),
      sup: t("editor_textStyle_sup"),
      through: t("editor_textStyle_through"),
      underline: t("editor_textStyle_underline"),
    },
    undo: {
      undo: t("editor_undo_undo"),
      redo: t("editor_undo_redo"),
    },
    todo: {
      todo: t("editor_todo_todo"),
    },
    uploadImgModule: {
      uploadImage: t("editor_uploadImgModule_uploadImage"),
    },
    tableModule: {
      insertTable: t("editor_tableModule_insertTable"),
    },
    videoModule: {
      insertVideo: t("editor_videoModule_insertVideo"),
      uploadVideo: t("editor_videoModule_uploadVideo"),
      videoSrc: t("editor_videoModule_videoSrc"),
      videoSrcPlaceHolder: t("editor_videoModule_videoSrcPlaceHolder"),
      videoPoster: t("editor_videoModule_videoPoster"),
      videoPosterPlaceHolder: t("editor_videoModule_videoPosterPlaceHolder"),
      ok: t("editor_videoModule_ok"),
    },
    listModule: {
      unOrderedList: t("editor_listModule_unOrderedList"),
      orderedList: t("editor_listModule_orderedList"),
    },
  };
};
