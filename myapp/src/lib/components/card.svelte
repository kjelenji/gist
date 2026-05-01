<script>
 import { totalPoints, riddlePoints, rebusPoints, storyPoints} from '../../lib/stores.js';
</script>
<main>
  <link rel="stylesheet" href="../src/public/styles.css">
  <div class="container">
    <div class="card">
      <h1 class="center">Maybe next time...</h1>
      
      <img src="/icon.png" class="gist-logo" alt="Gist Logo">


      <div class="split">
        <div class="points-col">
          <p>Demo</p>
          <p>？ Riddles: {$riddlePoints}</p>
          <p>⧉ Rebus: {$rebusPoints}</p>
          <p>🕮 Story: {$storyPoints}</p>
          <p><strong>☆ Total: {$totalPoints}</strong></p>
        </div>
        
        <div class="story-col">
          The adventurous 👨‍👩‍👧‍👦 reached the jungle 🏛️, their 🎒 bouncing. A gigantic 🌳 enveloped the temple, its 🪵 snaking down stone walls. Emerald 🪨🌱 clung to the 🪜. One explorer’s bag snagged on a 🌿, but they laughed, eager to uncover secrets.
        </div>
      </div>
    </div>
  </div>
</main>
