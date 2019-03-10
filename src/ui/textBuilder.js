const STATS_STYLE = { font: '24px OfenbacherSchwabCAT', fill: '#d1230c', align: 'center' };

export default {
  makeText(game, x, y, faceColor, borderColor, font = '32px Augusta', strokeThickness = 8) {
    const text = new Phaser.Text(game, x, y, '', { font, fill: faceColor, align: 'center' });
    text.anchor.setTo(0.5, 1);
    text.stroke = borderColor;
    text.strokeThickness = strokeThickness;
    text.setShadow(2, 2, "#333333", 2, true, false);
    return text;
  },
  makeStatText(game, x, y, faceColor, borderColor) {
    const text = new Phaser.Text(game, x, y, '', { font: STATS_STYLE.font, fill: faceColor, align: 'center' });
    text.anchor.setTo(0.5, 1);
    text.stroke = borderColor;
    text.strokeThickness = 4;
    text.setShadow(2, 2, "#333333", 2, true, false);
    return text;
  }
}