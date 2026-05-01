<script>
 import { totalPoints, riddlePoints, rebusPoints, storyPoints} from '../../lib/stores.js';
</script>
<main>
  <link rel="stylesheet" href="../src/public/styles.css">
  <div class="container">
    <div class="card">
      <img src="/icon.png" class="gist-logo" alt="Gist Logo">

      <h1 class="center" style="margin: 10px 0 5px 0;">Congratulations!</h1>
      <p>You have successfully solved the puzzle and unlocked the picture behind the story!</p>

      <div class="split">
        <div class="lr">
          <div class = "points-col">
                 <p>Demo</p>
                 <p>？ Riddles: {$riddlePoints}</p>
                 <p>⧉ Rebus: {$rebusPoints}</p>
                 <p>🕮 Story: {$storyPoints}</p>
                 <p><strong>☆ Total: {$totalPoints}</strong></p>
           </div>
        </div>

        <div class="lr" style="flex: 2; padding-left: 15px; display: flex; flex-direction: column; align-items: center;">
          <img src="../src/public/image.jpg" alt="Temple" style="width: 150px; border-radius: 8px; margin-bottom: 10px;">
          <p style="text-align: left; line-height: 1.4; margin: 0;">
            The adventurous 👨‍👩‍👧‍👦 finally reached the ancient jungle 🏛️, their 🎒 bouncing with every step. A gigantic 🌳 had completely enveloped one side, its powerful 🪵 snaking down the stone walls. Emerald green 🪨🌱 clung to every surface, making the eroded 🪜 treacherous.
          </p>
        </div>
      </div>
    </div>
  </div>
</main>
