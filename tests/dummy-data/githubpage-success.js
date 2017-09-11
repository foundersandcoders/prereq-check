module.exports = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Effective altruism</title>
    <meta name="viewport" content="width=device-width">
    <meta charset="UTF-8">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link href="build/css/normalize.css" rel="stylesheet">
    <link href="build/css/style.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Indie+Flower|Rock+Salt" rel="stylesheet">
  </head>

  <body>

    <header>
      <nav>
        <div class="burger" id="burger">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </div>
        <ul class="navbar hidden" id="navbar">
          <li><a href="#intro">intro</a></li>
          <li><a href="#growth">growth</a></li>
          <li><a href="#movement">movement</a></li>
          <li><a href="#ideas">ideas</a></li>
          <li><a href="#criticism">criticism</a></li>
          <li><a href="#more">more</a></li>
        </ul>
      </nav>
    </header>

    <main id="main">

    <section class="title parallax" id="title">
      <h1>An overview of effective altruism</h1>
    </section>

    <section id="intro">
      <h2>intro</h2>
      <p>Effective altruism is about doing the most good you can. This might be
        through donating to charities who have demonstrated their effectiveness or
        it might be through choice of career. It's a loose movement of people
        guided by evidence rather than their gut.</p>
      <div class="icon-graphic graphic-intro" id="graphic-intro">
        <span class="ion-erlenmeyer-flask icon-science" id="icon-science"></span>
        <span class="ion-heart icon-heart" id="icon-heart"></span>
      </div>
    </section>

    <div class="growth-image parallax">
    </div>

    <section id="growth">
      <h2>growth</h2>
      <p>1971: The seeds were sown by Peter Singer's <a target="_blank"
        href="https://www.utilitarian.net/singer/by/1972----.htm">Famine,
        Affluence and Morality</a>.
      <blockquote class="quote"
        cite="https://www.utilitarian.net/singer/by/1972----.htm"> If it is in
        our power to prevent something bad from happening, without thereby
        sacrificing anything of comparable moral importance, we ought, morally,
        to do it.  </blockquote> <p>Taking this idea to its logical conclusion,
        Singer suggests that we ought to give until we reach the level of <span
        class="tooltip">marginal utility<span class="tooltip-text">The point at
        which, by giving more, you'd reach the same level as the people you're
        helping.</span></span><a href="#1" class="ref">[1]</a>.</p>

      <p>The rise of charity evaluators has made it easier to decide where to
        give based on evidence.</p>
      <div class="timeline" id="timeline">
        <h3>Timeline of Charity Evaluators</h3>
        <div id="curve_chart">
        </div>
        <div class="timeline-buttons">
          <div class="timeline-back timeline-button unselectable" id="timeline-back">
            &lt;
          </div>
          <div class="timeline-forward timeline-button unselectable" id="timeline-forward">
            &gt;
          </div>
        </div>
      </div>
      <a href="#2" class="ref">[2]</a>
    </section>

    <div class="movement-image parallax">
    </div>

    <section id="movement" class="movement">
      <h2>movement</h2>
      <p>The term <span class="quote">effective altruism</span> came in to use
       around 2010<a href="#3" class="ref">[3]</a>.</p>
    
      <h3>big players:</h3>
      <p>Since 2007, <a href="http://www.givewell.org"
        target="_blank">GiveWell</a> has been making it easier to decide where
        to give by providing in-depth analysis and <span
        class="tooltip">evaluation<span class="tooltip-text">Criteria: evidence
        that programs work, cost effectiveness, room for funding,
        transparency.</span></span> of charities<a href="#4"
        class="ref">[4]</a>. In 2015 they estimate to have moved $110,135,779 to
        their top picks<a href="#5" class="ref">[5]</a>.</p>

      <p><a href="http://www.givingwhatwecan.org" target="_blank">Giving What We
       Can</a> launched in 2009, and now has 2,716 members who have donated a
       total of $22,242,740. Each member pledges to give 10% of their income,
       amounting to an estimated <span class="tooltip">$1.3 billion<span
       class="tooltip-text">A prediction based on members' current age and their
       own estimates of their future salary.</span></span> pledged so far<a
       class="ref" href="#6">[6]</a>.</p>
      
      <p>Taking a gentler approach, <a href="https://www.thelifeyoucansave.org/"
       target="_blank">The Life You Can Save</a> suggests pledging a minimum of
       1% of your income, scaling it up for those with larger salaries. Their
       18,798 members are estimated to have donated $1.35 million to highly
       effective charities in 2015<a href="#7" class="ref">[7]</a>.</p>

      <p><a href="https://80000hours.org/" target="_blank">80,000 hours</a>
       helps people find careers where they can do the most good. As of 2015 they
       led to 188 significant career changes based on their research<a href="#8"
       class="ref">[8]</a>.</p>
    </section>

    <div class="ideas-image parallax">
    </div>

    <section id="ideas">
      <h2>ideas</h2>

        <h3>your opportunity</h3>
        <blockquote class="quote"
          cite="https://www.effectivealtruism.org/articles/introduction-to-effective-altruism/#your-opportunity">
          Imagine if, one day, you saw a burning building, kicked the door down,
          ran in and rescued a small child. You'd feel like a hero - it would be
          one of the most important days of your life. What the evidence shows
          is that you can do that, every one or two years, for the rest of your
          working life.
        </blockquote>
        <div class="perlife">
          <div class="perlife-text"><p>The average salary in the UK is 
            £26,468<a class="ref" href="#9">[9]</a> - within the richest 3% 
            globally<a class="ref" href="#10">[10]</a>. 10% of this is enough to save 
            <span class="tooltip">1 life per year<span class="tooltip-text">GiveWell
            estimates that the average cost to save a life through it's
            recommended interventions is about £2,500.</span></span><a class="ref"
      href="#11">[11]</a>, and you'd still be in the richest 4%.</p></div>

          <div class="perlife-cost">
            <div class="cost">£2500</div>to save a life
          </div>
        </div>

        <h3>more for your money</h3>
        <p><span class="tooltip">80% of all blindness<span
        class="tooltip-text">That's 31 million people, 90% of whom live in
        the developing world.</span></span> is preventable<a class="ref"
        href="#12">[12]</a>. In the UK it costs about £50,000 to train and
        support a guide dog<a class="ref" href="#13">[13]</a>. In developing 
        countries <span class="tooltip">cataract<span class="tooltip-text">In
        low-income countries unoperated cataracts are the leading cause of
        blindless.</span></span> surgery costs £30<a class="ref" href="#14">[14]</a>.</p>
        <p>That's over 1500 people saved from blindness for the price of 1 guide dog.</p>
        <div class="icon-graphic graphic-blindness" id="graphic-blindness">
          <div class="icon-single" id="icon-single">
            <span class="ion-man"></span>
            <span class="ion-arrow-right-c arrow"></span>
          </div>
          <div class="icon-many" id="icon-many">
            <img alt="1500 man icons" src="img/1500-men.jpg">
          </div>
        </div>

        <h3>career</h3>
        <p>You have about 80,000 working hours in your lifetime<a href="#15"
        class="ref">[15]</a>. This provides a massive potential to do good.
        For some people this will mean doing good directly, e.g. as a doctor or
        working for a non-profit. For others it will be less direct such as
        through research, advocacy or earning to give<a href="#15"
        class="ref">[16]</a>.</p>
    </section>

    <div class="criticism-image parallax">
    </div>

    <section id="criticism">
      <h2>criticism</h2>

      <h3>Painting vs Child</h3>
      <p>You see a burning building. Inside there's a <span
      class="tooltip">picasso painting<span class="tooltip-text">'Women of
      Algiers' sold in 2015 for £115m/$179m. That's enough to save over
      40,000 lives.</span></span> and a child<a href="#16"
      class="ref">[17]</a>. You only have time to save
      one of them - which do you save? Effective altruism suggests you should
      <span class="tooltip">save the painting<span
      class="tooltip-text">According to Will MacAskill, co-founder of 80,000
      hours, Giving What We Can and the Centre for Effective
      Altruism.</span></span><a href="#17" class="ref">[18]</a>.</p>

      <h3>Is effective altruism ineffective?</h3>
      <p>People give less when <span class="tooltip">shown statistics<span
      class="tooltip-text">This is known as the 'indentifiable victim
      effect'.</span></span> about suffering compared to an anecdote. In
      fact people even give less when shown both rather than just the anecdote.
      Could effective altruism lead people to donate less, albeit more
      effectively?<a href="#18" class="ref">[19]</a></p>
    </section>

    <div class="more-image parallax">
    </div>

    <section id="more" class="more">
      <h2>more</h2>
      <div class="twitter">
      <a class="twitter-timeline" 
        data-dnt="true" 
        href="https://twitter.com/hashtag/effectivealtruism"
        data-widget-id="838736466113138689"
        data-height="500">
          #effectivealtruism Tweets
      </a>
      </div>

      <div class="links">
        <h3>Interesting things</h3>
        <ul>
          <li><a href="https://www.samharris.org/podcast/item/being-good-and-doing-good" target="_blank">Sam Harris chatting with Will MacAskill</a></li>
          <li><a href="https://youtu.be/Qslo4-DpzPs" target="_blank">Intelligence Squared Debate</a></li>
          <li><a href="https://www.andrew.cmu.edu/user/gl20/GeorgeLoewenstein/Papers_files/pdf/identifiable-victim.pdf" target="_blank">Explaining the Identifiable Victim Effect</a></li>
          <li><a href="https://80000hours.org/career-guide/job-satisfaction/" target="_blank">80,000 Hours looks into job satisfaction</a></li>
        </ul>
      </div>

    <span class="top-button unselectable" id="top-button">^</span>
    </section>

    <footer>
      <div class="sources">
        <h4>Sources</h4>
        <ol class="source-list" id="source-list">
          <li id="1">
            [1]
            <a href="https://youtu.be/NBWWX4ViD3E?t=247">
              Talks at Google: Peter Singer
            </a>
          </li>
          <li id="2">
            [2]
            <a href="https://en.wikipedia.org/wiki/Timeline_of_nonprofit_evaluation">
              Wikipedia: Timeline of Nonprofit Evaluation
            </a>
          </li>
          <li id="3">
            [3]
            <a href="https://en.wikipedia.org/wiki/Effective_altruism#History_as_a_social_movement">
              Wikipedia: Effective altruism
            </a>
          </li>
          <li id="4">
            [4]
            <a href="http://www.givewell.org/how-we-work/criteria">
              GiveWell Evaluation Criteria
            </a>
          </li>
          <li id="5">
            [5]
            <a href="http://www.givewell.org/about/impact">
              GiveWell Our Impact
            </a>
          </li>
          <li id="6">
            [6]
            <a href="https://www.givingwhatwecan.org/about-us/history/#a-growing-movement">
            Giving What We Can History
            </a>
          </li>
          <li id="7">
            [7]
            <a href="https://www.thelifeyoucansave.org/Take-the-Pledge">
            The Life You Can Save Pledge
            </a>
          </li>
          <li id="8">
            [8]
            <a href="https://80000hours.org/about/impact/">
              80,000 Hours Impact
            </a>
          </li>
          <li id="9">
            [9]
            <a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/timeseries/kab9/emp">
            ONS Average Pay
            </a>
          </li>
          <li id="10">
            [10]
            <a href="https://www.givingwhatwecan.org/get-involved/how-rich-am-i/">
              Giving What We Can Calculator
            </a>
          </li>
          <li id="11">
            [11]
            <a href="http://www.givewell.org/how-we-work/our-criteria/cost-effectiveness/cost-effectiveness-models">
              GiveWell Cost Effectiveness Models
            </a>
          </li>
          <li id="12">
            [12]
            <a href="http://www.who.int/mediacentre/factsheets/fs282/en/">
            WHO Factsheet</a>
          </li>
          <li id="13">
            [13]
            <a href="https://www.guidedogs.org.uk/media/3701632/Cost-of-a-guide-dog-2013.pdf">
            Guidedogs.org
            </a>
          </li>
          <li id="14">
            [14]
            <a href="https://www.sightsavers.org/what-we-do/sight/">
            Sightsavers
            </a>
          </li>
          <li id="15">
            [15]
            <a href="https://80000hours.org/">
              80,000 Hours
            </a>
          </li>
          <li id="16">
            [16]
            <a href="https://80000hours.org/career-guide/high-impact-jobs/">
            80,000 Hours High Impact Jobs
            </a>
          </li>
          <li id="17">
            [17]
            <a href="http://www.independent.co.uk/arts-entertainment/art/news/pablo-picasso-les-femmes-dalger-version-o-sells-for-179m-and-sets-new-world-record-10243056.html">
              The Independent: Picasso Sets New Record
            </a>
          </li>
          <li id="18">
            [18]
            <a href="https://youtu.be/Qslo4-DpzPs">
            Intelligence Squared Debate
            </a>
          </li>
          <li id="19">
            [19]
            <a href="http://knowledge.wharton.upenn.edu/article/to-increase-charitable-donations-appeal-to-the-heart-not-the-head/">
            University of Pennsylvania Publication
            </a>
          </li>
        </ol>
      </div>
    </footer>
    </main>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript" src="build/js/all.min.js"></script>
  </body>
</html>
`;