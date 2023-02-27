const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("타임아웃")
    .setDescription("시끄러운 냥이들을 조용히 시키자 ㅋㅋ")
    .setDefaultPermission(true) // 기본 권한을 true로 설정
    .addUserOption((option) =>
      option
        .setName("유저")
        .setDescription("조용히 시킬 냥이들을 고르라냥")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("시간")
        .setDescription("시간을 지정해주라냥 | (예시) 1초→1 ")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("사유")
        .setDescription("냥이들을 시키려면 조용히 시키는 이유를 대라냥")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const member = interaction.options.getMember("유저");
    const reason = interaction.options.getString("사유");
    const time = interaction.options.getInteger("시간");

    try {
      await member.timeout(time * 1000, reason); // * 0 제거
      await interaction.editReply({
        content: `시간이 ${time}초동안 지정됬다냥 **<@!${member.id}>** **( ${member.user.tag} )**`,
      });
    } catch {
      await interaction.editReply({
        content: "권한이 부족하다냥",
      });
    }
  },
};
