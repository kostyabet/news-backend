-- CreateTable
CREATE TABLE "article-status" (
    "as_id" SERIAL NOT NULL,
    "as_status" VARCHAR(50) NOT NULL,

    CONSTRAINT "article-status_pkey" PRIMARY KEY ("as_id")
);

-- CreateTable
CREATE TABLE "language" (
    "l_id" SERIAL NOT NULL,
    "l_language" VARCHAR(20) NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("l_id")
);

-- CreateTable
CREATE TABLE "notifiaction-status" (
    "ns_id" SERIAL NOT NULL,
    "ns_status" VARCHAR(50) NOT NULL,

    CONSTRAINT "notifiaction-status_pkey" PRIMARY KEY ("ns_id")
);

-- CreateTable
CREATE TABLE "notificatino-type" (
    "nt_id" SERIAL NOT NULL,
    "nt_type" VARCHAR(50) NOT NULL,

    CONSTRAINT "notificatino-type_pkey" PRIMARY KEY ("nt_id")
);

-- CreateTable
CREATE TABLE "reaction-type" (
    "rt_id" SERIAL NOT NULL,
    "rt_reaction" VARCHAR(50) NOT NULL,

    CONSTRAINT "reaction-type_pkey" PRIMARY KEY ("rt_id")
);

-- CreateTable
CREATE TABLE "subscription-status" (
    "ss_id" SERIAL NOT NULL,
    "ss_status" VARCHAR(50) NOT NULL,

    CONSTRAINT "subscription-status_pkey" PRIMARY KEY ("ss_id")
);

-- CreateTable
CREATE TABLE "theme" (
    "th_id" SERIAL NOT NULL,
    "th_theme" VARCHAR(50) NOT NULL,

    CONSTRAINT "theme_pkey" PRIMARY KEY ("th_id")
);

-- CreateTable
CREATE TABLE "user" (
    "u_id" SERIAL NOT NULL,
    "u_password-hash" VARCHAR(64) NOT NULL,
    "u_login" VARCHAR(30) NOT NULL,
    "u_settings" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("u_id")
);

-- CreateTable
CREATE TABLE "user-info" (
    "ui_user" INTEGER NOT NULL,
    "ui_role" INTEGER NOT NULL,
    "ui_email" VARCHAR(50),
    "ui_avatar" VARCHAR(50),
    "ui_name" VARCHAR(128),

    CONSTRAINT "user-info_pkey" PRIMARY KEY ("ui_user")
);

-- CreateTable
CREATE TABLE "user-role" (
    "ur_id" SERIAL NOT NULL,
    "ur_role" VARCHAR(50) NOT NULL,
    "ur_category" INTEGER NOT NULL,

    CONSTRAINT "user-role_pkey" PRIMARY KEY ("ur_id")
);

-- CreateTable
CREATE TABLE "article" (
    "a_id" SERIAL NOT NULL,
    "a_author" INTEGER NOT NULL,
    "a_content" TEXT NOT NULL,
    "a_title" VARCHAR(50) NOT NULL,
    "a_slug" VARCHAR(50),
    "a_status" INTEGER NOT NULL,
    "a_moderator" INTEGER NOT NULL,
    "a_language" INTEGER,

    CONSTRAINT "article_pkey" PRIMARY KEY ("a_id")
);

-- CreateTable
CREATE TABLE "category" (
    "c_id" SERIAL NOT NULL,
    "c_name" VARCHAR(50) NOT NULL,
    "c_description" VARCHAR(128),

    CONSTRAINT "category_pkey" PRIMARY KEY ("c_id")
);

-- CreateTable
CREATE TABLE "tag" (
    "t_id" SERIAL NOT NULL,
    "t_tag" VARCHAR(50) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("t_id")
);

-- CreateTable
CREATE TABLE "comment" (
    "c_id" SERIAL NOT NULL,
    "c_article" INTEGER NOT NULL,
    "c_user" INTEGER NOT NULL,
    "c_parent" INTEGER,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("c_id")
);

-- CreateTable
CREATE TABLE "reaction" (
    "r_article" INTEGER NOT NULL,
    "r_type" INTEGER NOT NULL,
    "r_user" INTEGER NOT NULL,

    CONSTRAINT "reaction_pkey" PRIMARY KEY ("r_article","r_user")
);

-- CreateTable
CREATE TABLE "notificatino" (
    "n_id" SERIAL NOT NULL,
    "n_status" INTEGER NOT NULL,
    "n_type" INTEGER NOT NULL,
    "n_user" INTEGER NOT NULL,

    CONSTRAINT "notificatino_pkey" PRIMARY KEY ("n_id")
);

-- CreateTable
CREATE TABLE "subscription" (
    "sb_author" INTEGER NOT NULL,
    "sb_user" INTEGER NOT NULL,
    "sb_status" INTEGER,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("sb_user","sb_author")
);

-- CreateTable
CREATE TABLE "settings" (
    "s_user" INTEGER NOT NULL,
    "s_theme" INTEGER NOT NULL,
    "s_language" INTEGER NOT NULL,
    "s_email-notifi" BOOLEAN,
    "s_push-notifi" BOOLEAN,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("s_user")
);

-- CreateTable
CREATE TABLE "article-category" (
    "ac_article" INTEGER NOT NULL,
    "ac_category" INTEGER NOT NULL,

    CONSTRAINT "article-category_pkey" PRIMARY KEY ("ac_article","ac_category")
);

-- CreateTable
CREATE TABLE "article-tag" (
    "at_article" INTEGER NOT NULL,
    "at_tag" INTEGER NOT NULL,

    CONSTRAINT "article-tag_pkey" PRIMARY KEY ("at_article","at_tag")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_u_login_key" ON "user"("u_login");

-- CreateIndex
CREATE UNIQUE INDEX "user_u_login_u_password-hash_key" ON "user"("u_login", "u_password-hash");

-- CreateIndex
CREATE INDEX "user-info_ui_user_ui_email_ui_avatar_ui_name_idx" ON "user-info"("ui_user", "ui_email", "ui_avatar", "ui_name");

-- CreateIndex
CREATE UNIQUE INDEX "user-info_ui_user_ui_role_key" ON "user-info"("ui_user", "ui_role");

-- CreateIndex
CREATE UNIQUE INDEX "user-role_ur_id_ur_role_ur_category_key" ON "user-role"("ur_id", "ur_role", "ur_category");

-- CreateIndex
CREATE INDEX "article_a_id_a_content_a_title_a_slug_a_author_idx" ON "article"("a_id", "a_content", "a_title", "a_slug", "a_author");

-- CreateIndex
CREATE INDEX "article_a_id_a_moderator_a_language_a_status_idx" ON "article"("a_id", "a_moderator", "a_language", "a_status");

-- CreateIndex
CREATE INDEX "category_c_id_c_name_c_description_idx" ON "category"("c_id", "c_name", "c_description");

-- CreateIndex
CREATE INDEX "notificatino_n_user_n_type_n_status_idx" ON "notificatino"("n_user", "n_type", "n_status");

-- CreateIndex
CREATE UNIQUE INDEX "notificatino_n_user_n_type_key" ON "notificatino"("n_user", "n_type");

-- CreateIndex
CREATE INDEX "settings_s_user_s_email-notifi_s_push-notifi_idx" ON "settings"("s_user", "s_email-notifi", "s_push-notifi");

-- CreateIndex
CREATE INDEX "settings_s_user_s_theme_s_language_idx" ON "settings"("s_user", "s_theme", "s_language");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_u_settings_fkey" FOREIGN KEY ("u_settings") REFERENCES "settings"("s_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-info" ADD CONSTRAINT "user-info_ui_user_fkey" FOREIGN KEY ("ui_user") REFERENCES "user"("u_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-info" ADD CONSTRAINT "user-info_ui_role_fkey" FOREIGN KEY ("ui_role") REFERENCES "user-role"("ur_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-role" ADD CONSTRAINT "user-role_ur_category_fkey" FOREIGN KEY ("ur_category") REFERENCES "category"("c_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_a_author_fkey" FOREIGN KEY ("a_author") REFERENCES "user"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_a_moderator_fkey" FOREIGN KEY ("a_moderator") REFERENCES "user"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_a_status_fkey" FOREIGN KEY ("a_status") REFERENCES "article-status"("as_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_a_language_fkey" FOREIGN KEY ("a_language") REFERENCES "language"("l_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_c_article_fkey" FOREIGN KEY ("c_article") REFERENCES "article"("a_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_c_user_fkey" FOREIGN KEY ("c_user") REFERENCES "user"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_c_parent_fkey" FOREIGN KEY ("c_parent") REFERENCES "comment"("c_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_r_article_fkey" FOREIGN KEY ("r_article") REFERENCES "article"("a_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_r_type_fkey" FOREIGN KEY ("r_type") REFERENCES "reaction-type"("rt_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_r_user_fkey" FOREIGN KEY ("r_user") REFERENCES "user"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificatino" ADD CONSTRAINT "notificatino_n_status_fkey" FOREIGN KEY ("n_status") REFERENCES "notifiaction-status"("ns_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificatino" ADD CONSTRAINT "notificatino_n_type_fkey" FOREIGN KEY ("n_type") REFERENCES "notificatino-type"("nt_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificatino" ADD CONSTRAINT "notificatino_n_user_fkey" FOREIGN KEY ("n_user") REFERENCES "user"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_sb_author_fkey" FOREIGN KEY ("sb_author") REFERENCES "user"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_sb_user_fkey" FOREIGN KEY ("sb_user") REFERENCES "user"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_sb_status_fkey" FOREIGN KEY ("sb_status") REFERENCES "subscription-status"("ss_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_s_user_fkey" FOREIGN KEY ("s_user") REFERENCES "user-info"("ui_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_s_theme_fkey" FOREIGN KEY ("s_theme") REFERENCES "theme"("th_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_s_language_fkey" FOREIGN KEY ("s_language") REFERENCES "language"("l_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article-category" ADD CONSTRAINT "article-category_ac_article_fkey" FOREIGN KEY ("ac_article") REFERENCES "article"("a_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article-category" ADD CONSTRAINT "article-category_ac_category_fkey" FOREIGN KEY ("ac_category") REFERENCES "category"("c_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article-tag" ADD CONSTRAINT "article-tag_at_article_fkey" FOREIGN KEY ("at_article") REFERENCES "article"("a_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article-tag" ADD CONSTRAINT "article-tag_at_tag_fkey" FOREIGN KEY ("at_tag") REFERENCES "tag"("t_id") ON DELETE CASCADE ON UPDATE CASCADE;
